package org.example;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

import java.time.LocalDateTime;//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {
           User u=new User();
           u.setId(102L);
           u.setName("Vansh");
           u.setPassword("1234");
           u.setEmail("vansh12@gmail.com");
           u.setRole("Enginner");
           u.setActive(true);
           u.setCreatedAt(LocalDateTime.of(2024, 5, 10, 14, 30));
           u.setLastLogin(LocalDateTime.of(2025, 6, 4, 12, 0)); // 4th June 2025, 12:00 PM

        Configuration config=new Configuration();
        config.addAnnotatedClass(org.example.User.class);
        config.configure();
        SessionFactory factory=config.buildSessionFactory();
        Session session=factory.openSession();
        Transaction transaction=session.beginTransaction();
        session.persist(u);
        transaction.commit();

    }
    }
