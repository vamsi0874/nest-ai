import { Controller, Get } from '@nestjs/common';
// import  ImageKit from 'imagekit';
const ImageKit = require('imagekit');

@Controller('api')
export class UploadController {
    private imagekit: any;

    constructor() {

        this.imagekit = new ImageKit({
            publicKey: process.env.IMAGE_KIT_PUBLIC_KEY!,
            privateKey: process.env.IMAGE_KIT_PRIVATE_KEY!,
            urlEndpoint: process.env.IMAGE_KIT_ENDPOINT!,
        });
    }

    @Get('upload')
    async generateAuthToken() {
        console.log('ooooo');
        return this.imagekit.getAuthenticationParameters();
    }
}

