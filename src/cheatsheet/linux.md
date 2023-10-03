# Linux

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
