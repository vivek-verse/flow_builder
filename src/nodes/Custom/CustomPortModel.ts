import { LinkModel, PortModel, DefaultLinkModel, PortModelAlignment } from '@projectstorm/react-diagrams';

export class CustomPortModel extends PortModel {
  constructor(alignment: PortModelAlignment, type : string) {
    super({
      type,
      name: alignment,
      alignment: alignment
    });
  }

  createLinkModel(): LinkModel {
    return new DefaultLinkModel();
  }
}
