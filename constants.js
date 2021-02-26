module.exports = {
    user_status: ["active", "block", "suspend", "delete"],
    email_error_already_exist: "Email Already Registered!",
    success: "Request Success!",
    user_pick_sign_up: ["_id", "name", "email", "phone", "profile", "status", "isEmailVerified", "role",],
    actor_pick_sign_up: ["_id", "name", "info", "image", "dateOfBirth"],
    user_pick_profile: ["_id", "name", "email", "phone", "profile", "status", "isEmailVerified", "role",],
    email_verification_expire_minutes: 5 * 60000,
    forget_password_expire_minutes: 5 * 60000,
    sms_verification_expire_minutes: 1 * 60000,
    base_url: process.env.NODE_ENV === "development" ? "http://localhost:4000" : ""
}