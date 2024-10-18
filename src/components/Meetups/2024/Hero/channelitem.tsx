import { type Channel, ChannelBox, ChannelLogo } from "planby";

interface ChannelItemProps {
  channel: Channel;
}

export function ChannelItem({ channel }: ChannelItemProps) {
  const { position, logo } = channel;

  return (
    <ChannelBox {...position}>
      {/* Overwrite styles by add eg. style={{ maxHeight: 52, maxWidth: 52,... }} */}
      {/* Or stay with default styles */}
      <ChannelLogo alt="Logo" src={logo} style={{ maxHeight: 40, maxWidth: 40 }} />
    </ChannelBox>
  );
}
