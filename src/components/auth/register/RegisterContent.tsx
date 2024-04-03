import Link from "next/link";
import { Image } from "primereact/image";

import RegisterFormComponent from "./RegisterForms";

const RegisterContent: React.FC = () => (
  <div className="grid h-full m-0 p-0">
    <div className="col-12 m-0 p-0 md:col-5 sm:px-2 md:px-4 lg:px-6 xl:px-8 grid bg-dark-green">
      <div className="col-12 flex align-items-center md:align-items-start justify-content-center md:justify-content-start">
        <Link href="/" className="md:mt-4">
          <Image
            src="/images/logo/Ivory-Guide-Logo-Horizontal-Light.svg"
            alt="Logo"
            width="250"
            className="relative mb-3"
          />
        </Link>
      </div>

      <div className="col-12 flex align-items-center md:align-items-start justify-content-center md:justify-content-start">
        <span className="text-2xl lg:text-7xl md:text-5xl text-beige font-bold text-center md:text-left line-height-2">
          High Quality Patient Care At Your Fingertips
        </span>
      </div>
    </div>

    <div className="col-12 md:col-7 m-0 p-0 h-screen relative overflow-hidden overflow-y-auto justify-content-end">
      <RegisterFormComponent />
    </div>
  </div>
);

export default RegisterContent;
