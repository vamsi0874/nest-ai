// import { Controller, Get } from '@nestjs/common';
// import ImageKit from 'imagekit';

// @Controller('upload')
// export class UploadController {
//     private imagekit: ImageKit;

//     constructor() {
//         this.imagekit = new ImageKit({
//             publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
//             privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
//             urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
//         });
//     }

//     @Get()
//     async getAuthParams() {
//         return this.imagekit.getAuthenticationParameters();
//     }
// }
