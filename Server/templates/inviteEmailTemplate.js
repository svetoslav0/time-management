function generateInviteEmail(inviteLink, expiresOn) {
    return `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>OpsHero - Project Monitoring</h2>
        <p>Hello!</p>
        <p>
          You were invited to create an account and monitor the progress of the project that we work on.<br>
          Follow this link to create your account now: 
          <a href="${inviteLink}" target="_blank" style="color: #1a73e8;">${inviteLink}</a>
        </p>
        <p style="font-size: 0.9em; color: #555;">
          Keep in mind that this invite link will <strong>expire on ${expiresOn.toDateString()}</strong>.
        </p>
        <p>Thank you!<br>OpsHero Team</p>
      </div>
    `;
};

module.exports = generateInviteEmail;