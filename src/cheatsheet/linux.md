# Linux

## Commands

#### Utility

```bash
mktemp # create a temporary directory

MYTEMPDIR=$(mktemp) # create a temporary directory and store the path in a variable
echo $MYTEMPDIR # print the path to the temporary directory

# ---

echo $RANDOM # print a random number
```

## Security

#### ufw - Uncomplicated Firewall

```bash
# Enable firewall
sudo ufw enable

# Disable firewall
sudo ufw disable

# Check status
sudo ufw status
sudo ufw status verbose # for verbose output

# Allow port
sudo ufw allow 3000

# Close/Block port
sudo ufw deny 3000

# Delete rule
sudo ufw delete allow 3000
```

## Hosting

### Nginx

#### Useful Commands

```bash
# Start Nginx
sudo systemctl start nginx

# Stop Nginx
sudo systemctl stop nginx

# Restart Nginx
sudo systemctl restart nginx

# Reload Nginx (without dropping connections):
sudo systemctl reload nginx

# Test Nginx Configuration for Syntax Errors
sudo nginx -t

# Create Symbolic Link to Enable a Site
sudo ln -s /etc/nginx/sites-available/your_site_name /etc/nginx/sites-enabled/

# View Nginx Error Logs
sudo tail -f /var/log/nginx/error.log

# View Nginx Access Logs
sudo tail -f /var/log/nginx/access.log
```

#### Useful links

- [`root` vs `alias`](https://stackoverflow.com/a/10647080)
- [location block priority](https://stackoverflow.com/a/5238430)

## Systemd

#### Useful Commands

```bash
# --- Working with systemd service ---

# Start service/Unit
sudo systemctl start nginx

# Stop service/Unit
sudo systemctl stop nginx

# Restart service/Unit
sudo systemctl restart nginx

# Reload service/Unit
sudo systemctl reload nginx

# Autostart service/Unit on boot
sudo systemctl enable nginx

# Disable autostart service/Unit on boot
sudo systemctl disable nginx

# --- Debugging ---

# Check status of a service/Unit
journalctl -u nginx

# Get recent logs
journalctl -e -u nginx

# Check status of a service/Unit and follow the logs (continuous)
journalctl -u nginx -f
```
