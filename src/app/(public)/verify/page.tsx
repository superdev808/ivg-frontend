'use client';
import { useState, useEffect, use } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useGetVerifyUserQuery } from '@/redux/hooks/apiHooks';

export default function VerifyPage() {
     const searchParams = useSearchParams()

    const { data, error, isLoading, isSuccess } = useGetVerifyUserQuery(searchParams.get('token') || '', {
       });

    let message;
    if (isLoading ) {
        message = <p>Verifying...</p>;
    } else if (isSuccess) {
        message = <p>Your account has been successfully verified!</p>;
    } else if (error) {
        message = <p>This verification link has expired or is invalid.</p>;
    }

    return (
        <div>
            <h1>Email Verification</h1>
            {message}
        </div>
    );
}
