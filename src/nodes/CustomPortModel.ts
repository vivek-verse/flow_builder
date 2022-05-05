import { LinkModel, PortModel, DefaultLinkModel, PortModelAlignment } from '@projectstorm/react-diagrams';

export class CustomPortModel extends PortModel {
  constructor(alignment: PortModelAlignment) {
    super({
      type: 'custom',
      name: alignment,
      alignment: alignment
    });
  }

  createLinkModel(): LinkModel {
    return new DefaultLinkModel();
  }
}