FROM node:25-trixie-slim
WORKDIR /workspace

# Install VS Code devcontainer dependencies
RUN apt-get update && apt-get install -yqq --no-install-recommends \
    ca-certificates \
    curl \
    git \
    iputils-ping \
    jq \
    openssh-client \
    python3-dev \
    python-is-python3 \
    shfmt \
    vim \
    # VS Code/Electron dependencies for headless testing
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libatspi2.0-0 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libgbm1 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxrandr2 \
    libxshmfence1 \
    xvfb \
    xauth \
    && \
    apt-get autoremove && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    update-ca-certificates

# Install NPM packages
# COPY package.json .
ENV PATH=node_modules/.bin:${PATH}
# RUN mkdir -p /root/.npm/ && chown -R 1000:0 "/root/.npm" && npm install --include=dev

COPY ./.devcontainer/config/.bashrc ./.devcontainer/config/.bash_completion /root/

CMD ["bash"]
