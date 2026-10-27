from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings using Pydantic BaseSettings for environment management."""

    # Application settings
    app_name: str = Field(default="", description="Application name")
    app_description: str = Field(
        default="A Citizen Application with FastAPI and React",
        description="Application description",
    )
    app_version: str = Field(default="1.0.0", description="Application version")
    debug: bool = Field(default=False, description="Debug mode")

    # Database settings
    postgres_host: str = Field(default="127.0.0.1", description="PostgreSQL host")
    postgres_port: int = Field(default=5432, description="PostgreSQL port")
    postgres_user: str = Field(default="postgres", description="PostgreSQL user")
    postgres_password: str = Field(
        default="postgres", description="PostgreSQL password"
    )
    postgres_db: str = Field(default="main_db", description="PostgreSQL database name")

    # CORS settings - now handled dynamically
    cors_credentials: bool = Field(default=True, description="Allow CORS credentials")
    cors_methods: list[str] = Field(default=["*"], description="Allowed CORS methods")
    cors_headers: list[str] = Field(default=["*"], description="Allowed CORS headers")

    @property
    def cors_origins(self) -> list[str]:
        """Dynamically determine CORS origins based on environment."""

        if self.app_name:
            # Production: use Lingarian platform URL
            return [f"https://lingarian.lingaro.app/{self.app_name}"]
        else:
            # Local development: use localhost
            return [
                "http://localhost:5173",
                "http://127.0.0.1:5173",
                "http://localhost:6600",
                "http://127.0.0.1:6600",
            ]

    # Logging settings
    log_level: str = Field(default="INFO", description="Logging level")
    log_format: str = Field(
        default="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        description="Log format",
    )

    @property
    def database_url_composed(self) -> str:
        """Compose database URL from PostgreSQL components."""
        return (
            f"postgresql://{self.postgres_user}:{self.postgres_password}"
            f"@{self.postgres_host}:{self.postgres_port}/{self.postgres_db}"
        )

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",  # Ignore extra environment variables
    )


# Global settings instance
settings = Settings()
