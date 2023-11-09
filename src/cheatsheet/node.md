# Node

<br>

## Libraries

### [pm2](https://www.npmjs.com/package/pm2) - Process Manager

```bash
# Start app
pm2 start app.js

# Run app with custom name
pm2 start app.js --name my-api

# List running applications
pm2 list

# View Status
pm2 status

# Manage app
pm2 stop     <app_name|namespace|id|'all'|json_conf>
pm2 restart  <app_name|namespace|id|'all'|json_conf>
pm2 reload  <app_name|namespace|id|'all'|json_conf>
pm2 delete   <app_name|namespace|id|'all'|json_conf>
pm2 describe <id|app_name>

# Get application logs
pm2 logs <app_name|namespace|id|'all'|json_conf>

# Perform operation on all apps
pm2 restart all # Restart all apps

# Run apps from configuration
pm2 start ecosystem.config.js

# Save current process list to reload on reboot
pm2 save

# Generate startup script to run pm2 on boot
# Make sure you have ran `pm2 save` first
pm2 startup

# Disable pm2 from starting on boot
pm2 unstartup launchd # MacOS
pm2 unstartup systemd # Linux
```
