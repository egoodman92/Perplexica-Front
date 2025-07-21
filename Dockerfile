FROM searxng/searxng:latest

# Copy our custom configuration
COPY searxng /etc/searxng

# Expose port 8080 (SearXNG default)
EXPOSE 8080

# Use the default SearXNG entrypoint
CMD ["/usr/local/searxng/dockerfiles/docker-entrypoint.sh"] 