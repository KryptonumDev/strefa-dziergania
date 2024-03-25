import BadgeSection, { BadgeSection_Query, type BadgeSectionTypes } from './_blogPost/BadgeSection';
import HighlightedImage, { HighlightedImage_Query, HighlightedImageTypes } from './_blogPost/HighlightedImage';
import ImageBadge, { ImageBadge_Query, type ImageBadgeTypes } from './_blogPost/ImageBadge';
import ImagesGrid, { ImagesGrid_Query, type ImagesGridTypes } from './_blogPost/ImagesGrid';
import ProcessComponent, { ProcessComponent_Query, ProcessComponentTypes } from './_blogPost/ProcessComponent';
import ProcessShowcase, { ProcessShowcase_Query, type ProcessShowcaseTypes } from './_blogPost/ProcessShowcase';
import QuoteSection, { QuoteSection_Query, type QuoteSectionTypes } from './_blogPost/QuoteSection';
import TableSection, { TableSection_Query, type TableSectionTypes } from './_blogPost/TableSection';

type PortableContentMap = {
  ImageBadge: ImageBadgeTypes;
  ImagesGrid: ImagesGridTypes;
  TableSection: TableSectionTypes;
  BadgeSection: BadgeSectionTypes;
  HighlightedImage: HighlightedImageTypes;
  ProcessComponent: ProcessComponentTypes;
  ProcessShowcase: ProcessShowcaseTypes;
  QuoteSection: QuoteSectionTypes;
};

export type PortableContentTypes = PortableContentMap[keyof PortableContentMap] & { _type: string };

export default function PortableContent({ data }: { data: PortableContentTypes[] }) {
  return data?.map((item) => {
    const portableContentType = item._type as keyof PortableContentMap;
    const portableContentMap: Record<string, React.ReactNode> = {
      ImageBadge: <ImageBadge {...(item as ImageBadgeTypes)} />,
      ImagesGrid: <ImagesGrid {...(item as ImagesGridTypes)} />,
      TableSection: <TableSection {...(item as TableSectionTypes)} />,
      BadgeSection: <BadgeSection {...(item as BadgeSectionTypes)} />,
      HighlightedImage: <HighlightedImage {...(item as HighlightedImageTypes)} />,
      ProcessComponent: <ProcessComponent {...(item as ProcessComponentTypes)} />,
      ProcessShowcase: <ProcessShowcase {...(item as ProcessShowcaseTypes)} />,
      QuoteSection: <QuoteSection {...(item as QuoteSectionTypes)} />,
    };
    const DynamicComponent = portableContentMap[portableContentType];
    if (!DynamicComponent) {
      return null;
    }
    return DynamicComponent;
  });
}

export const PortableContent_Query = /* groq */ `
  content[] {
    _type,
    ${ImageBadge_Query}
    ${ImagesGrid_Query}
    ${TableSection_Query}
    ${BadgeSection_Query}
    ${HighlightedImage_Query}
    ${ProcessComponent_Query}
    ${ProcessShowcase_Query}
    ${QuoteSection_Query}
  }`;
