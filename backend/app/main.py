import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import app.routers.health as health
from app.config import settings
from app.database import check_database_connection

# Configure logging
logging.basicConfig(level=settings.log_level, format=settings.log_format)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Handle application lifespan events."""
    # Startup
    logger.info(f"Starting {settings.app_name} v{settings.app_version}")

    # Check database connection
    db_connected = await check_database_connection()
    if not db_connected:
        logger.warning("Database connection failed, but application will continue")

    logger.info("Application startup completed")

    yield

    # Shutdown
    logger.info("Application shutdown completed")


# Create FastAPI application instance
app = FastAPI(
    title=settings.app_name or "FastAPI Application",
    description=settings.app_description,
    version=settings.app_version,
    debug=settings.debug,
    lifespan=lifespan,
)

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=settings.cors_credentials,
    allow_methods=settings.cors_methods,
    allow_headers=settings.cors_headers,
)

# Include routers
app.include_router(health.router, tags=["Health"])


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "message": f"Hello from {settings.app_name}!",
        "version": settings.app_version,
        "status": "running",
    }
