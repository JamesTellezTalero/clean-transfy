/**
 * Contrato base para todos los casos de uso de la aplicación.
 *
 * Esta interfaz genérica permite definir casos de uso que reciben una entrada (`TInput`)
 * y devuelven una salida (`TOutput`) de forma asíncrona.
 *
 * Se recomienda que todos los casos de uso implementen esta interfaz para mantener
 * una estructura uniforme y predecible.
 *
 * @template TInput - Tipo del parámetro de entrada que recibe el caso de uso.
 * @template TOutput - Tipo del resultado que devuelve el caso de uso.
 *
 * @example
 * interface CreateUserInput {
 *   name: string;
 *   email: string;
 * }
 *
 * interface CreateUserOutput {
 *   id: number;
 *   uuid: string;
 * }
 *
 * class CreateUserUseCase implements IUseCase<CreateUserInput, CreateUserOutput> {
 *   async execute(input: CreateUserInput): Promise<CreateUserOutput> {
 *     lógica de creación de usuario
 *   }
 * }
 */
export interface IUseCase<TInput, TOutput> {
    /**
     * Ejecuta la lógica del caso de uso.
     *
     * @param input - Datos necesarios para ejecutar el caso de uso.
     * @returns Una promesa que resuelve con el resultado del caso de uso.
     */
    execute(input: TInput): Promise<TOutput>;
}
