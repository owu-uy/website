import EmbeddedForm from "components/Meetups/2024/EmbeddedForm";

export default function Intrest() {
  const url = "https://docs.google.com/forms/d/e/1FAIpQLSe7QPkYcoz1tZ-j4N-BvqNfkLMtp9Oq8vQ285mTR7EuJPDVnw/viewform?embedded=true";

  return (
    <EmbeddedForm
      title="¡Formulario de Interes!"
      url={url}
    />
  );
}
