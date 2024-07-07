import Footer from "components/shared/Footer";

export const metadata = {
  title: "Sponsors | OWU Uruguay",
  description: "Te invitamos a formar parte de la comunidad de sponsors de La Meetup 2024",
};

export default function Sponsors() {
  const SPONSORS_FORM =
    "https://docs.google.com/forms/d/e/1FAIpQLSemC7vrDw38LTWcBUhIYjarqMMVUfE-dSnBPUAsNzBWd6uqcQ/viewform?embedded=true";

  return (
    <section className="flex w-full flex-col md:container">
      <div className="flex h-full min-h-screen flex-col items-center justify-center gap-5 py-12">
        <h1 className="text-center text-5xl font-bold text-yellow-400">¡Formulario de Sponsors!</h1>
        <div className="flex w-full flex-col items-center justify-center" style={{ filter: "invert(1)" }}>
          <div
            className="flex w-full flex-col items-center justify-center"
            style={{ filter: "hue-rotate(189.73deg) saturate(18.61%)" }}
          >
            <iframe
              className="iframeembed flex min-h-[135rem] w-full max-w-[750px] flex-1 flex-col sm:min-h-[126rem] md:min-h-[130rem]"
              src={SPONSORS_FORM}
              title="form"
            >
              Cargando…
            </iframe>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}
