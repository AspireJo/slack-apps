export class NomieesData {
    nominees: Array<{
        display_name: number;
        status_tex: string;
        status_emoji: string;
        image: string;
        totalStars: number;
        clientNo: number;
        isActive: boolean;
        token: string

        starsList: Array<{
            stars_count: number,
            description: string,
            show_me: boolean,
            createdAt: Date,
            profile: { display_name: string, image, string }
        }>
    }>;
}
