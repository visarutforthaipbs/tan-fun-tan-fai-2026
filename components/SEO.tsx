import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
}

export const SEO: React.FC<SEOProps> = ({
    title = 'ทันฝุ่นทันไฟ - Tan Fun Tan Fai',
    description = 'แพลตฟอร์มติดตามและแก้ไขปัญหาฝุ่น PM2.5 ภาคเหนือ ด้วยข้อมูลจริงและการมีส่วนร่วมของภาคประชาชน',
    image = '/logo/logo.svg', // Fallback to logo if no specific image is provided
    url = typeof window !== 'undefined' ? window.location.href : '',
    type = 'website'
}) => {
    const siteTitle = title === 'ทันฝุ่นทันไฟ - Tan Fun Tan Fai' ? title : `${title} | ทันฝุ่นทันไฟ`;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{siteTitle}</title>
            <meta name="description" content={description} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={siteTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />

            {/* Additional Tags */}
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="theme-color" content="#F15A24" />
            <link rel="canonical" href={url} />
        </Helmet>
    );
};
