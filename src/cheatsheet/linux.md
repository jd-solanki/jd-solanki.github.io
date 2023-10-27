# Linux

## Commands

#### Utility

```bash
mktemp # create a temporary directory

MYTEMPDIR=$(mktemp) # create a temporary directory and store the path in a variable
echo $MYTEMPDIR # print the path to the temporary directory
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

### Hosting

#### Nginx

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
