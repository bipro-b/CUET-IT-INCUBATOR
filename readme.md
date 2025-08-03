Acces at `http://51.20.64.33:3000/api/ec2`.

---

```markdown
# Automatation Deployment G

This guide explains how to **automate Dockerized Node.js app deployment** on an AWS EC2 instance using GitHub Actions.

---

## Project Structure

```

CUET-Incubator/
├── src/
├── index.js
├── server.js
├── package.json
├── Dockerfile
├── .env (ignored by git)
└── .github/workflows/deploy.yml

````

---

## Prerequisites

- AWS EC2 instance (Ubuntu 22.04 LTS recommended)
- Docker installed on EC2
- Domain or Public IP for your EC2
- GitHub repository for your app
- GitHub Secrets configured for EC2 connection

---

## Step 1: Prepare Your EC2 Instance

1. **Launch Ubuntu EC2 instance** (e.g. `t3.micro`)
2. **Open port 3000** in EC2 Security Group inbound rules (TCP 3000, source 0.0.0.0/0)
3. **SSH into EC2** and install Docker:

   ```bash
   sudo apt update
   sudo apt install docker.io -y
   sudo systemctl enable docker --now
   sudo usermod -aG docker ubuntu  # Optional: Allow running docker without sudo
````

4. **Create project directory:**

   ```bash
   mkdir ~/cuet-incubator
   ```

---

## Step 2: Setup Your Node.js App and Dockerfile

Example `Dockerfile`:

```Dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

---

## Step 3: Configure `.env`

Create `.env` locally with environment variables:

```
MONGO="mongodb+srv://your_user:your_pass@cluster.mongodb.net/dbname?retryWrites=true&w=majority"
PORT=3000
TOKEN_SECRET=your_jwt_secret
```

**Add `.env` to `.gitignore`** to avoid pushing secrets.

---

## Step 4: Setup GitHub Secrets

Go to your GitHub repository → Settings → Secrets → Actions, and add:

| Name                | Value                            |
| ------------------- | -------------------------------- |
| EC2\_HOST           | Your EC2 public IP               |
| EC2\_USER           | `ubuntu`                         |
| EC2\_SSH\_KEY       | Your private SSH key content     |
| ENV\_FILE\_CONTENTS | Full content of your `.env` file |

---

## Step 5: GitHub Actions Workflow (`.github/workflows/deploy.yml`)

```yaml
name: Deploy to EC2

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Copy code to EC2
        uses: appleboy/scp-action@master
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ${{ secrets.EC2_USER }}
          key: ${{ secrets.EC2_SSH_KEY }}
          source: "."
          target: "/home/ubuntu/cuet-incubator"

      - name: SSH and deploy
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ${{ secrets.EC2_USER }}
          key: ${{ secrets.EC2_SSH_KEY }}
          script: |
            cd /home/ubuntu/cuet-incubator
            echo "${{ secrets.ENV_FILE_CONTENTS }}" > .env
            docker stop cuet-incubator || true
            docker rm cuet-incubator || true
            docker build -t cuet-incubator .
            docker run -d -p 3000:3000 --env-file .env --name cuet-incubator cuet-incubator
```

---

## Step 6: Deploy

* Push your code changes to the `main` branch.
* GitHub Actions will automatically:

  * Connect to EC2
  * Copy files
  * Write `.env`
  * Build and run Docker container

---

## Step 7: Access Your App

Open in browser:

```
http://51.20.64.33:3000/api/ec2
```

Replace `51.20.64.33` with your EC2 public IP.

---

## Troubleshooting

* Make sure EC2 security group allows inbound TCP on port 3000.

* Check container logs on EC2:

  ```bash
  docker logs cuet-incubator
  ```

* Ensure `.env` variables are correct.

---

## Optional Improvements

* Set up Nginx reverse proxy with HTTPS (Let’s Encrypt).
* Map Docker to run on port 80 for default HTTP.
* Automate SSL certificate renewals.

---

**Now we have a fully automated Dockerized deployment pipeline with GitHub Actions and EC2!** 🎉

---


```
