import React from 'react';
import {useLocale, useTranslations} from "next-intl";

const TestingTranslations = () => {

    const t = useTranslations('IndexPage');
    const locale = useLocale();

    return (
        <div>
            <h5 className="text-3xl mb-4">
                {t('example.title')}
            </h5>
            <p>
                {t('example.description')}
            </p>
        </div>
    );
};

export default TestingTranslations;