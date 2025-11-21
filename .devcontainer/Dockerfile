FROM node:25-trixie-slim
ARG DEBIAN_FRONTEND=noninteractive
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
    tree \
    vim \
    # VS Code/Electron dependencies for headless testing
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcairo2 \
    libdbus-1-3 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    xvfb \
    xauth \
    && \
    apt-get autoremove && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    update-ca-certificates

# Install NPM packages
ENV PATH=node_modules/.bin:${PATH}
COPY ./package.json ./package.json
RUN npm install --include=dev

COPY ./.devcontainer/config/.bashrc ./.devcontainer/config/.bash_completion /root/

CMD ["bash"]
