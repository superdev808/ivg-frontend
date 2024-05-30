import React, { useState } from 'react';
import Link from "next/link";
import { Image } from "primereact/image";
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
          width="120"
          height="120"
          className="relative mb-3"
        />
      </Link>
      <ConfirmDialog  visible={visible} onHide={() => setVisible(false)} message="Are you sure you would like to restart this calculator?" 
    header="Restart Calculator?" icon="pi pi-exclamation-triangle" accept={handleAccept} reject={() => setVisible(false)} />
    </div>
  );
};

export default QuizRestartButton;
