package com.fayerautos.backend.service;
import java.util.Date;
import org.springframework.stereotype.Service;
import com.fayerautos.backend.model.UserAccount;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    private static final String SECRET =
        "fayerautos-super-secret-key-very-long";

    public String generateToken(
        UserAccount user
    ) {

        return Jwts.builder()
            .setSubject(user.getUsername())
            .claim("userId", user.getId())
            .claim("role", user.getUserRoleId())
            .setIssuedAt(new Date())
            .setExpiration(
                new Date(
                    System.currentTimeMillis()
                    + 86400000
                )
            )
            .signWith(
                Keys.hmacShaKeyFor(
                    SECRET.getBytes()
                ),
                SignatureAlgorithm.HS256
            )
            .compact();
    }
}