package com.fayerauto;
import java.sql.*;

public class ConnectingDatabase {

    private static final String URL = "jdbc:postgresql://localhost:5432/postgres";
    private static final String USUARIO = "postgres";
    private static final String SENHA = "1445";

    public static void main(String[] args) {
        // Testa conexão e operações
        try (Connection conexao = DriverManager.getConnection(URL, USUARIO, SENHA)) {
            System.out.println("Conexão estabelecida com sucesso.");
            listarUsuarios(conexao);
        } catch (SQLException e) {
            System.err.println("Erro ao conectar: " + e.getMessage());
        }

    }

    // Método para listar dados
    private static void listarUsuarios(Connection conexao) {

        String sql = "SELECT * FROM user_accounts";

        try (Statement stmt = conexao.createStatement();
            ResultSet rs = stmt.executeQuery(sql)) {

            System.out.println("Lista de usuários:");

            while (rs.next()) {

                System.out.printf(
                    "ID: %d | Nome: %s | Username: %s | Idade: %d | Sexo: %s%n",
                    rs.getInt("id"),
                    rs.getString("full_name"),
                    rs.getString("username"),
                    rs.getInt("age"),
                    rs.getString("gender")
                );
            }

        } catch (SQLException e) {
            System.err.println("Erro ao listar usuários: " + e.getMessage());
        }
    }
}

