<?php
/**
 * Book a Demo lead endpoint for Marketome AI Automation landing page.
 * Deploy with PHP-capable shared hosting. Vite dev server does not run this file.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function respond(bool $success, string $message = '', int $status = 200): void
{
    http_response_code($status);
    echo json_encode(
        $success
            ? ['success' => true]
            : ['success' => false, 'message' => $message !== '' ? $message : 'Unable to submit lead.'],
        JSON_UNESCAPED_SLASHES
    );
    exit;
}

function clean_header_value(string $value): string
{
    return trim(str_replace(["\r", "\n", "%0a", "%0d", "%0A", "%0D"], '', $value));
}

function sanitize_text(string $value): string
{
    $value = strip_tags($value);
    $value = preg_replace('/\s+/u', ' ', $value) ?? $value;
    return trim($value);
}

try {
    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
        respond(false, 'Unable to submit lead.', 405);
    }

    $raw = file_get_contents('php://input');
    $data = json_decode($raw ?: '', true);

    if (!is_array($data)) {
        respond(false, 'Unable to submit lead.', 400);
    }

    // Honeypot — bots only
    $honeypot = sanitize_text((string) ($data['companyFax'] ?? ''));
    if ($honeypot !== '') {
        respond(true);
    }

    $name = sanitize_text((string) ($data['name'] ?? ''));
    $phone = sanitize_text((string) ($data['phone'] ?? ''));
    $email = sanitize_text((string) ($data['email'] ?? ''));
    $website = sanitize_text((string) ($data['website'] ?? ''));
    $ctaSource = sanitize_text((string) ($data['ctaSource'] ?? 'unknown'));
    $pageUrl = sanitize_text((string) ($data['pageUrl'] ?? ''));
    $submittedAt = sanitize_text((string) ($data['submittedAt'] ?? ''));
    $formOpenedAt = sanitize_text((string) ($data['formOpenedAt'] ?? ''));

    if ($name === '' || mb_strlen($name) < 2) {
        respond(false, 'Unable to submit lead.', 422);
    }

    $phoneDigits = preg_replace('/\D+/', '', $phone) ?? '';
    if ($phone === '' || strlen($phoneDigits) < 7 || strlen($phoneDigits) > 15) {
        respond(false, 'Unable to submit lead.', 422);
    }

    if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        respond(false, 'Unable to submit lead.', 422);
    }

    if ($website === '') {
        respond(false, 'Unable to submit lead.', 422);
    }

    if (!preg_match('#^https?://#i', $website)) {
        $website = 'https://' . $website;
    }

    $websiteHost = parse_url($website, PHP_URL_HOST);
    if (!is_string($websiteHost) || $websiteHost === '' || strpos($websiteHost, '.') === false) {
        respond(false, 'Unable to submit lead.', 422);
    }

    $calendarUrl = 'https://cal.id/marketome/101-with-marketome?duration=30';
    $to = 'Support@marketome.com';
    $from = 'Support@marketome.com';
    $safeName = clean_header_value($name);
    $safeEmail = clean_header_value($email);

    $subject = clean_header_value('New AI Automation Demo Lead - ' . $safeName);
    if ($subject === '') {
        $subject = 'New AI Automation Demo Lead';
    }

    $body = "New AI Automation Demo Request\n\n"
        . "Name:\n{$name}\n\n"
        . "Phone:\n{$phone}\n\n"
        . "Email:\n{$email}\n\n"
        . "Business Website:\n{$website}\n\n"
        . "CTA Source:\n{$ctaSource}\n\n"
        . "Landing Page:\n{$pageUrl}\n\n"
        . "Submitted:\n{$submittedAt}\n\n"
        . "Form opened at:\n{$formOpenedAt}\n\n"
        . "Calendar destination:\n{$calendarUrl}\n";

    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'From: Marketome <' . $from . '>',
        'Reply-To: ' . $safeEmail,
        'X-Mailer: Marketome-Demo-Lead',
    ];

    $sent = @mail($to, $subject, $body, implode("\r\n", $headers));

    if (!$sent) {
        respond(false, 'Unable to submit lead.', 500);
    }

    respond(true);
} catch (Throwable $e) {
    respond(false, 'Unable to submit lead.', 500);
}
