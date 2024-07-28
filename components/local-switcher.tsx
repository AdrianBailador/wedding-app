'use client';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function LocalSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();

  const onSelectChange = (value: string) => {
    startTransition(() => {
      router.replace(`/${value}`);
    });
  };

  return (
    <Select defaultValue={localActive} onValueChange={onSelectChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">
          <div className="inline-flex items-center">
            <svg aria-hidden="true" className="h-3.5 w-3.5 rounded-full me-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1990 1050">
              <g>
                <g>
                  <rect y="0.095" style={{fill:"#FFFFFF"}} width="1989.479" height="1048.199"/>
                  <polygon style={{fill:"#CE1124"}} points="1989.628,419.525 1113.632,419.525 1113.632,0.16 874.514,0.16 874.514,419.525 0.833,419.525 0.833,629.092 874.514,629.092 874.514,1048.284 1113.632,1048.284 1113.632,629.092 1989.628,629.092"/>
                </g>
                <g>
                  <polygon style={{fill:"#00247D"}} points="0.019,122.154 0.019,350.376 433.953,350.376"/>
                  <polygon style={{fill:"#00247D"}} points="239.417,0.05 233.059,0.339 795.718,297.83 795.718,0.05"/>
                  <polygon style={{fill:"#CE1124"}} points="667.793,348.932 0.019,0.105 0.019,82.323 508.669,348.932"/>
                  <polygon style={{fill:"#CE1124"}} points="1322.212,699.36 1989.986,1048.187 1989.986,965.969 1481.336,699.36"/>
                </g>
                <g>
                  <polygon style={{fill:"#00247D"}} points="0.019,927.896 0.019,699.673 433.953,699.673"/>
                  <polygon style={{fill:"#00247D"}} points="239.417,1050 233.059,1049.71 795.718,752.222 795.718,1050"/>
                  <polygon style={{fill:"#CE1124"}} points="664.378,699.336 0.456,1048.008 155.729,1048.163 796.355,713.516 796.355,699.336"/>
                </g>
                <g>
                  <polygon style={{fill:"#00247D"}} points="1990,122.104 1990,350.325 1556.068,350.325"/>
                  <polygon style={{fill:"#00247D"}} points="1750.602,0 1756.96,0.288 1194.303,297.778 1194.303,0"/>
                  <polygon style={{fill:"#CE1124"}} points="1989.359,0.488 1840.013,0.476 1194.873,337.48 1194.873,349.303 1331.364,349.303"/>
                </g>
                <g>
                  <polygon style={{fill:"#00247D"}} points="1990,927.811 1990,699.588 1556.068,699.588"/>
                  <polygon style={{fill:"#00247D"}} points="1750.602,1049.913 1756.96,1049.625 1194.303,752.135 1194.303,1049.913"/>
                </g>
              </g>
            </svg>
            <span>English</span>
          </div>
        </SelectItem>
        <SelectItem value="es">
          <div className="inline-flex items-center">
            <svg aria-hidden="true" className="h-3.5 w-3.5 rounded-full me-2"
                 xmlns="http://www.w3.org/2000/svg" id="flag-icon-css-es"
                 viewBox="0 0 640 480">
              <g strokeWidth="1pt" fillRule="evenodd">
                <path fill="red" d="M0 0h640v480H0z"/>
                <path fill="#ffc400" d="M0 120h640v240H0z"/>
                <path fill="red" d="M0 360h640v120H0z"/>
              </g>
            </svg>
            <span>Español</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
