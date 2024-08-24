import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className='w-full footer flex-col justify-center items-center flex mt-auto px-5 pt-[76px] pb-4'>
        <div className="content w-full max-w-[1200px] flex-col items-center flex;">
            <div className="divider-footer w-full h-px bg-[hsl(var(--divider))] mb-8"></div>
            <div className="footer-content w-full text-center flex-col justify-start items-center flex px-[10%] gap-4 text-xs">
                <Image
                    className="my-2"
                    src={"/isotipo_transparent.svg"}
                    alt={"logo"}
                    width={70}
                    height={70}
                />
                <p>
                    Made with <span>❤️</span> by
                </p>
                <p>
                    Victor Alvarado & Adrián Bailador
                </p>
                <p>{t('copyright')}</p>
            </div>
        </div>
    </footer>
  );
}