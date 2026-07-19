export type Block =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "code"; text: string }
  | { type: "image"; src: string; alt: string; width: number; height: number };

export type TopicContent = Record<string, Block[]>;
