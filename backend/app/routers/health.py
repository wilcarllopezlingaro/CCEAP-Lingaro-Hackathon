from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import text
from sqlalchemy.orm import Session

from ..database import get_db

router = APIRouter()


@router.get("/health")
async def health_check(db: Session = Depends(get_db)):
    try:
        result = db.execute(text("SELECT 1"))
        result.fetchone()
        return {
            "status": "healthy",
            "database": "healthy",
        }

    except Exception as err:
        raise HTTPException(
            status_code=503,
            detail={
                "status": "degraded",
                "database": "unhealthy",
            },
        ) from err
