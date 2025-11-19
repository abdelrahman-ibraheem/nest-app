import {
  Controller,
  Get,
  Patch,
  Req,
  UseGuards,
} from "@nestjs/common";
import { CartService } from "./cart.services";
import { AuthGuard } from "src/modules/auth/auth.guards";
import { Request } from "express";
import { Types } from "mongoose";

interface AuthRequest extends Request {
  user: { id: string };
}

@Controller("cart")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get("get-cart")
  @UseGuards(AuthGuard)
  async GetCart(@Req() req: AuthRequest) {
    const userId = new Types.ObjectId(req.user.id);

    return await this.cartService.GetCart(userId);
  }

  @Patch("add-item")
  @UseGuards(AuthGuard)
  async addToCart(@Req() req: AuthRequest) {
    const userId = new Types.ObjectId(req.user.id);
    const { product } = req.body;

    return await this.cartService.addToCart({
      userId,
      product: new Types.ObjectId(product),
        quantity: 1,
    });
  }

  @Patch("remove-item")
  @UseGuards(AuthGuard)
  async removeFromCart(@Req() req: AuthRequest) {
    const userId = new Types.ObjectId(req.user.id);
    const { product } = req.body;

    return await this.cartService.removeFromCart({
      userId,
      product: new Types.ObjectId(product),
    });
  }
}
