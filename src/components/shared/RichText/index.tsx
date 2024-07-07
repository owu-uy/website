import { type ElementNode } from "@payloadcms/richtext-slate";
import { slateToHtml } from "@slate-serializers/html";
import ReactMarkdown from "react-markdown";

type RichTextProps = {
  content?: string;
};
type PayloadCMSRichTextProps = {
  richText: ElementNode[];
};

export function RichText({ content }: RichTextProps) {
  return <ReactMarkdown>{content}</ReactMarkdown>;
}

export function PayloadCMSRichText({ richText }: PayloadCMSRichTextProps) {
  return <div dangerouslySetInnerHTML={{ __html: slateToHtml(richText) }} />;
}
