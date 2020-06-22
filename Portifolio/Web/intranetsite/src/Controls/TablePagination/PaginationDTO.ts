export class PaginationDTO {
    Position: number;
    Link: string;

    constructor(Position: number, Link: string) {
        this.Position = Position;
        this.Link = Link
    }
}