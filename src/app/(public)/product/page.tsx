'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { HeroSection } from '@/components/public/shared/HeroSection';

import classNames from 'classnames/bind';
import styles from '../page.module.scss';
import { ProductHeroSection } from '@/components/public/product/ProductHeroSection';
import { ProductContentSection } from '@/components/public/product/ProductContentSection';

const howItWorksItems = ['Restoration material selection', 'All-On-X implant guidance', 'Scanbody selection'];

export default function ProductPage() {
	return (
		<>
			<ProductHeroSection />

			<ProductContentSection />
		</>
	);
}
