import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { ConfirmDialog } from "primereact/confirmdialog";

const QuizRestartButton = () => {
  const [visible, setVisible] = useState(false);

  const handleAccept = () => {
    window.location.reload();
  }

  return (
    <div>
      <Link href="#" onClick={() => setVisible(true)}>
        <Image
          src="/images/calculators/quiz-restart.png"
          alt="Restart"
          width={60}
          height={60}
          style={{
            width: '120px',
            height: '120px',
          }}
          className="relative"
          quality={40}
        />
      </Link>
      <ConfirmDialog  visible={visible} onHide={() => setVisible(false)} message="Are you sure you would like to restart this calculator?" 
    header="Restart Calculator?" icon="pi pi-exclamation-triangle" accept={handleAccept} reject={() => setVisible(false)} />
    </div>
  );
};

export default QuizRestartButton;
