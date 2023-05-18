import { Injectable } from '@nestjs/common';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from './pedido.entity';
import { Repository } from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { StatusPedido } from './enum/statuspedido.enum';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) { }
  async cadastraPedido(usuarioId: string,) {
    const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId })//sem essa busca, não há como estabelecer o relacionamento
    const pedidoEntity = new PedidoEntity();

    pedidoEntity.valorTotal = 0
    pedidoEntity.status = StatusPedido.EM_PROCESSAMENTO
    pedidoEntity.usuario = usuario
    const pedidoCriado = await this.pedidoRepository.save(pedidoEntity)

    return pedidoCriado
  }

  async obtemPedidosDeUsuario(usuarioId: string) {
    return this.pedidoRepository.find({
      where: {
        usuario: { id: usuarioId },
      },
      relations: {
        usuario: true,
      },
    });
  }


  findAll() {
    return `This action returns all pedido`;
  }


  update(id: number, updatePedidoDto: UpdatePedidoDto) {
    return `This action updates a #${id} pedido`;
  }

  remove(id: number) {
    return `This action removes a #${id} pedido`;
  }
}
