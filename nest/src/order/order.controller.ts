import { Post, Req, UseGuards, Controller } from "@nestjs/common";
import { Request } from "express";
import { Types } from "mongoose";
import { AuthGuard } from "src/modules/auth/auth.guards";
import { OrderService } from "./order.services";

interface AuthRequest extends Request {
  user: { id: string };
}

@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post("create-order")
  @UseGuards(AuthGuard)
  async createOrder(@Req() req: AuthRequest) {
    const userId = new Types.ObjectId(req.user.id);

    const {
      discount,
      instructions,
      address,
      phone,
      paymentMethod,
        totalPrice,


    } = req.body;

    return await this.orderService.createOrder({
      userId,
      discount,
      instructions,
      address,
      phone,
      paymentMethod,
        totalPrice,
        
    });
  }
  }

