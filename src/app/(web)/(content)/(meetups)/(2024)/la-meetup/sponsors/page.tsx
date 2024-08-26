import EmbeddedForm from "components/Meetups/2024/EmbeddedForm";

export const metadata = {
  title: "Sponsors | OWU Uruguay",
  description: "Te invitamos a formar parte de la comunidad de sponsors de La Meetup 2024",
};

export default function Sponsors() {
  const url =
    "https://docs.google.com/forms/d/e/1FAIpQLSemC7vrDw38LTWcBUhIYjarqMMVUfE-dSnBPUAsNzBWd6uqcQ/viewform?embedded=true";

  return (
    <EmbeddedForm
      title="¡Formulario de Sponsors!"
      url={url}
    />
  );
}
