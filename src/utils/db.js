const Database = require('better-sqlite3');
const db = new Database(__basedir + '/data/db.sqlite');

// Set pragmas
db.pragma('synchronous = 1');

/**
 * Enabling WAL mode causes issues with file locking within WSL, works fine on a normal Unix system
 * Issue documented here: https://github.com/microsoft/WSL/issues/2395
 */
db.pragma('journal_mode = wal');

/** ------------------------------------------------------------------------------------------------
 * TABLES
 * ------------------------------------------------------------------------------------------------ */
// BOT SETTINGS TABLE
db.prepare(`
  CREATE TABLE IF NOT EXISTS settings (
    guild_id TEXT PRIMARY KEY,
    guild_name TEXT,
    prefix TEXT DEFAULT "u!" NOT NULL,
    system_channel_id TEXT,
    starboard_channel_id TEXT,
    admin_role_id TEXT,
    mod_role_id TEXT,
    mute_role_id TEXT,
    auto_role_id TEXT,
    auto_kick INTEGER,
    random_color INTEGER DEFAULT 0 NOT NULL,
    mod_channel_ids TEXT,
    disabled_commands TEXT,
    mod_log_id TEXT,
    member_log_id TEXT,
    nickname_log_id TEXT,
    role_log_id TEXT,
    message_edit_log_id TEXT,
    message_delete_log_id TEXT,
    verification_role_id TEXT,
    verification_channel_id TEXT,
    verification_message TEXT,
    verification_message_id TEXT,
    welcome_channel_id TEXT,
    welcome_message TEXT,
    farewell_channel_id TEXT,
    farewell_message TEXT
  );
`).run();

// USERS TABLE
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    user_id TEXT,
    user_name TEXT,
    user_discriminator TEXT,
    guild_id TEXT,
    guild_name TEXT,
    date_joined TEXT,
    bot INTEGER,
    warns TEXT,
    current_member INTEGER NOT NULL,
    PRIMARY KEY (user_id, guild_id)
  );
`).run();

/** ------------------------------------------------------------------------------------------------
 * PREPARED STATEMENTS
 * ------------------------------------------------------------------------------------------------ */
// BOT SETTINGS TABLE
const settings = {
  insertRow: db.prepare(`
    INSERT OR IGNORE INTO settings (
      guild_id,
      guild_name,
      system_channel_id,
      welcome_channel_id,
      farewell_channel_id,
      mod_log_id,
      admin_role_id,
      mod_role_id,
      mute_role_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `),

  // Selects
  selectRow: db.prepare('SELECT * FROM settings WHERE guild_id = ?;'),
  selectGuilds: db.prepare('SELECT guild_name, guild_id FROM settings'),
  selectPrefix: db.prepare('SELECT prefix FROM settings WHERE guild_id = ?;'),
  selectSystemChannelId: db.prepare('SELECT system_channel_id FROM settings WHERE guild_id = ?;'),
  selectStarboardChannelId: db.prepare('SELECT starboard_channel_id FROM settings WHERE guild_id = ?;'),
  selectAdminRoleId: db.prepare('SELECT admin_role_id FROM settings WHERE guild_id = ?;'),
  selectModRoleId: db.prepare('SELECT mod_role_id FROM settings WHERE guild_id = ?;'),
  selectMuteRoleId: db.prepare('SELECT mute_role_id FROM settings WHERE guild_id = ?;'),
  selectAutoRoleId: db.prepare('SELECT auto_role_id FROM settings WHERE guild_id = ?;'),
  selectAutoKick: db.prepare('SELECT auto_kick FROM settings WHERE guild_id = ?;'),
  selectRandomColor: db.prepare('SELECT random_color FROM settings WHERE guild_id = ?;'),
  selectModChannelIds: db.prepare('SELECT mod_channel_ids FROM settings WHERE guild_id = ?;'),
  selectDisabledCommands: db.prepare('SELECT disabled_commands FROM settings WHERE guild_id = ?;'),
  selectModLogId: db.prepare('SELECT mod_log_id FROM settings WHERE guild_id = ?;'),
  selectMemberLogId: db.prepare('SELECT member_log_id FROM settings WHERE guild_id = ?;'),
  selectNicknameLogId: db.prepare('SELECT nickname_log_id FROM settings WHERE guild_id = ?;'),
  selectRoleLogId: db.prepare('SELECT role_log_id FROM settings WHERE guild_id = ?;'),
  selectMessageEditLogId: db.prepare('SELECT message_edit_log_id FROM settings WHERE guild_id = ?;'),
  selectMessageDeleteLogId: db.prepare('SELECT message_delete_log_id FROM settings WHERE guild_id = ?;'),
  selectVerification: db.prepare(`
    SELECT verification_role_id, verification_channel_id, verification_message, verification_message_id 
    FROM settings
    WHERE guild_id = ?;
  `),
  selectWelcomes: db.prepare('SELECT welcome_channel_id, welcome_message FROM settings WHERE guild_id = ?;'),
  selectFarewells: db.prepare('SELECT farewell_channel_id, farewell_message FROM settings WHERE guild_id = ?;'),

  // Updates
  updatePrefix: db.prepare('UPDATE settings SET prefix = ? WHERE guild_id = ?;'),
  updateGuildName: db.prepare('UPDATE settings SET guild_name = ? WHERE guild_id = ?;'),
  updateSystemChannelId: db.prepare('UPDATE settings SET system_channel_id = ? WHERE guild_id = ?;'),
  updateStarboardChannelId: db.prepare('UPDATE settings SET starboard_channel_id = ? WHERE guild_id = ?;'),
  updateAdminRoleId: db.prepare('UPDATE settings SET admin_role_id = ? WHERE guild_id = ?;'),
  updateModRoleId: db.prepare('UPDATE settings SET mod_role_id = ? WHERE guild_id = ?;'),
  updateMuteRoleId: db.prepare('UPDATE settings SET mute_role_id = ? WHERE guild_id = ?;'),
  updateAutoRoleId: db.prepare('UPDATE settings SET auto_role_id = ? WHERE guild_id = ?;'),
  updateAutoKick: db.prepare('UPDATE settings SET auto_kick = ? WHERE guild_id = ?;'),
  updateRandomColor: db.prepare('UPDATE settings SET random_color = ? WHERE guild_id = ?;'),
  updateModChannelIds: db.prepare('UPDATE settings SET mod_channel_ids = ? WHERE guild_id = ?;'),
  updateDisabledCommands: db.prepare('UPDATE settings SET disabled_commands = ? WHERE guild_id = ?;'),
  updateModLogId: db.prepare('UPDATE settings SET mod_log_id = ? WHERE guild_id = ?;'),
  updateMemberLogId: db.prepare('UPDATE settings SET member_log_id = ? WHERE guild_id = ?;'),
  updateNicknameLogId: db.prepare('UPDATE settings SET nickname_log_id = ? WHERE guild_id = ?;'),
  updateRoleLogId: db.prepare('UPDATE settings SET role_log_id = ? WHERE guild_id = ?;'),
  updateMessageEditLogId: db.prepare('UPDATE settings SET message_edit_log_id = ? WHERE guild_id = ?;'),
  updateMessageDeleteLogId: db.prepare('UPDATE settings SET message_delete_log_id = ? WHERE guild_id = ?;'),
  updateVerificationRoleId: db.prepare('UPDATE settings SET verification_role_id = ? WHERE guild_id = ?;'),
  updateVerificationChannelId: db.prepare('UPDATE settings SET verification_channel_id = ? WHERE guild_id = ?;'),
  updateVerificationMessage: db.prepare('UPDATE settings SET verification_message = ? WHERE guild_id = ?;'),
  updateVerificationMessageId: db.prepare('UPDATE settings SET verification_message_id = ? WHERE guild_id = ?;'),
  updateWelcomeChannelId: db.prepare('UPDATE settings SET welcome_channel_id = ? WHERE guild_id = ?;'),
  updateWelcomeMessage: db.prepare('UPDATE settings SET welcome_message = ? WHERE guild_id = ?;'),
  updateFarewellChannelId: db.prepare('UPDATE settings SET farewell_channel_id = ? WHERE guild_id = ?;'),
  updateFarewellMessage: db.prepare('UPDATE settings SET farewell_message = ? WHERE guild_id = ?;')
};
// USERS TABLE
const users = {
  insertRow: db.prepare(`
    INSERT OR IGNORE INTO users (
      user_id, 
      user_name,
      user_discriminator,
      guild_id, 
      guild_name, 
      date_joined,
      bot,
      current_member
    ) VALUES (?, ?, ?, ?, ?, ?, ?, 0, 0, 1);
  `),

 };

module.exports = {
  settings,
  users
};
