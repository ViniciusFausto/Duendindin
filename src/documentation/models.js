/**
 * @swagger
 *     definitions:
 *         Login:
 *             type: object
 *             properties:
 *                 email:
 *                     type: string
 *                     description: The user email.
 *                     example: string
 *                 senha:
 *                     type: string
 *                     description: The user password.
 *                     example: string
 *         CreateUser:
 *             type: object
 *             properties:
 *                 nome:
 *                     type: string
 *                     description: The user email.
 *                     example: string
 *                 email:
 *                     type: string
 *                     description: The user passoword.
 *                     example: string
 *                 senha:
 *                     type: string
 *                     description: The user passoword.
 *                     example: string
 *                 data_nascimento:
 *                     type: string
 *                     description: The user passoword.
 *                     example: 1997/06/11
 *                 cep:
 *                     type: string
 *                     description: The user passoword.
 *                     example: 14801000
 *                 cidade:
 *                     type: string
 *                     description: The user passoword.
 *                     example: Araraquara
 *                 estado:
 *                     type: string
 *                     description: The user passoword.
 *                     example: SP
 *                 ativo:
 *                     type: boolean
 *                     description: The user passoword.
 *                     example: true
 *                 renda_fixa:
 *                     type: integer
 *                     description: The user passoword.
 *                     example: 2000
 *         UpdateUser:
 *             type: object
 *             properties:
 *                 nome:
 *                     type: string
 *                     description: The user email.
 *                     example: string
 *                 email:
 *                     type: string
 *                     description: The user passoword.
 *                     example: string
 *                 senha:
 *                     type: string
 *                     description: The user passoword.
 *                     example: string
 *                 data_nascimento:
 *                     type: string
 *                     description: The user passoword.
 *                     example: 1997/06/11
 *                 cep:
 *                     type: string
 *                     description: The user passoword.
 *                     example: 14801000
 *                 cidade:
 *                     type: string
 *                     description: The user passoword.
 *                     example: Araraquara
 *                 estado:
 *                     type: string
 *                     description: The user passoword.
 *                     example: SP
 *                 ativo:
 *                     type: boolean
 *                     description: The user passoword.
 *                     example: true
 *         UpdatePasswordUser:
 *             type: object
 *             properties:
 *                 email:
 *                     type: string
 *                     description: The user email.
 *                     example: string
 *                 nova_senha:
 *                     type: string
 *                     description: The user new password.
 *                     example: string
 *                 senha_atual:
 *                     type: string
 *                     description: The user current password.
 *                     example: string
 *         CreateCategory:
 *             type: object
 *             properties:
 *                 usuarioID:
 *                     type: integer
 *                     description: The category user id.
 *                     example: 1
 *                 nome:
 *                     type: string
 *                     description: The category name.
 *                     example: string
 *                 descricao:
 *                     type: string
 *                     description: The category description.
 *                     example: string
 *         UpdateCategory:
 *             type: object
 *             properties:
 *                 nome:
 *                     type: string
 *                     description: The category name.
 *                     example: string
 *                 descricao:
 *                     type: string
 *                     description: The category description.
 *                     example: string
 *         UpdateSetting:
 *             type: object
 *             properties:
 *                 renda_fixa:
 *                     type: integer
 *                     description: The fixed income.
 *                     example: 1
 *                 limite_lazer:
 *                     type: integer
 *                     description: The spending % limit for leisure.
 *                     example: 1
 *                 limite_contas:
 *                     type: integer
 *                     description: The spending % limit for accounts.
 *                     example: 1
 *                 limite_investimento:
 *                     type: integer
 *                     description: The investment % limit.
 *                     example: 1
 *         CreateGain:
 *             type: object
 *             properties:
 *                 categoriaID:
 *                     type: integer
 *                     description: The fixed income.
 *                     example: 1
 *                 nome:
 *                     type: string
 *                     description: The spending % limit for leisure.
 *                     example: string
 *                 data:
 *                     type: string
 *                     description: The spending % limit for accounts.
 *                     example: 2022/10/17
 *                 valor:
 *                     type: integer
 *                     description: The investment % limit.
 *                     example: 1
 *                 descricao:
 *                     type: string
 *                     description: The spending % limit for leisure.
 *                     example: 1
 *                 recorrente:
 *                     type: boolean
 *                     description: The spending % limit for accounts.
 *                     example: true
 *                 tipo:
 *                     type: string
 *                     description: The investment % limit.
 *                     example: F/V
 *         UpdateGain:
 *             type: object
 *             properties:
 *                 categoriaID:
 *                     type: integer
 *                     description: The fixed income.
 *                     example: 1
 *                 nome:
 *                     type: string
 *                     description: The spending % limit for leisure.
 *                     example: string
 *                 data:
 *                     type: string
 *                     description: The spending % limit for accounts.
 *                     example: 2022/10/17
 *                 valor:
 *                     type: integer
 *                     description: The investment % limit.
 *                     example: 1
 *                 descricao:
 *                     type: string
 *                     description: The spending % limit for leisure.
 *                     example: 1
 *                 recorrente:
 *                     type: boolean
 *                     description: The spending % limit for accounts.
 *                     example: true
 *                 tipo:
 *                     type: string
 *                     description: The investment % limit.
 *                     example: F/V
 *         CreateExpense:
 *             type: object
 *             properties:
 *                 categoriaID:
 *                     type: integer
 *                     description: The fixed income.
 *                     example: 1
 *                 nome:
 *                     type: string
 *                     description: The spending % limit for leisure.
 *                     example: string
 *                 data:
 *                     type: string
 *                     description: The spending % limit for accounts.
 *                     example: 2022/10/17
 *                 valor:
 *                     type: integer
 *                     description: The investment % limit.
 *                     example: 1
 *                 descricao:
 *                     type: string
 *                     description: The spending % limit for leisure.
 *                     example: 1
 *                 recorrente:
 *                     type: boolean
 *                     description: The spending % limit for accounts.
 *                     example: true
 *                 tipo:
 *                     type: string
 *                     description: The investment % limit.
 *                     example: F/V
 *                 pago:
 *                     type: boolean
 *                     description: The investment % limit.
 *                     example: true
 *         UpdateExpense:
 *             type: object
 *             properties:
 *                 categoriaID:
 *                     type: integer
 *                     description: The fixed income.
 *                     example: 1
 *                 nome:
 *                     type: string
 *                     description: The spending % limit for leisure.
 *                     example: string
 *                 data:
 *                     type: string
 *                     description: The spending % limit for accounts.
 *                     example: 2022/10/17
 *                 valor:
 *                     type: integer
 *                     description: The investment % limit.
 *                     example: 1
 *                 descricao:
 *                     type: string
 *                     description: The spending % limit for leisure.
 *                     example: 1
 *                 recorrente:
 *                     type: boolean
 *                     description: The spending % limit for accounts.
 *                     example: true
 *                 tipo:
 *                     type: string
 *                     description: The investment % limit.
 *                     example: F/V
 *                 pago:
 *                     type: boolean
 *                     description: The investment % limit.
 *                     example: true
 */
 