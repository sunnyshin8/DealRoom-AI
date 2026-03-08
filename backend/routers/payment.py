import os
import hashlib
import time
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class PaymentRequest(BaseModel):
    plan_name: str
    amount: str
    firstname: str
    email: str
    phone: str

@router.post("/hash")
async def generate_payment_hash(request: PaymentRequest):
    key = os.getenv("PAYU_API_KEY")
    salt = os.getenv("PAYU_SALT_32")

    if not key or not salt:
        raise HTTPException(status_code=500, detail="PayU credentials not configured")

    # Generate a unique transaction ID
    txnid = f"TXN_{int(time.time())}"
    
    # Hash sequence: key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||SALT
    hash_sequence = f"{key}|{txnid}|{request.amount}|{request.plan_name}|{request.firstname}|{request.email}|||||||||||{salt}"
    
    # Generate SHA512 hash
    hash_object = hashlib.sha512(hash_sequence.encode('utf-8'))
    hash_value = hash_object.hexdigest().lower()
    
    return {
        "key": key,
        "txnid": txnid,
        "amount": request.amount,
        "productinfo": request.plan_name,
        "firstname": request.firstname,
        "email": request.email,
        "phone": request.phone,
        "hash": hash_value,
        "surl": "http://localhost:3000/reports?payment=success",
        "furl": "http://localhost:3000/pricing?payment=failed",
        "payu_url": "https://secure.payu.in/_payment"  # Production URL
    }
