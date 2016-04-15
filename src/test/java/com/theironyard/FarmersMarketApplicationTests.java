package com.theironyard;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.theironyard.entities.Inventory;
import com.theironyard.entities.User;
import com.theironyard.services.*;
import org.junit.Assert;
import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = FarmersMarketApplication.class)
@WebAppConfiguration
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class FarmersMarketApplicationTests {

    @Autowired
    UserRepository users;

    @Autowired
    InventoryRepository inventories;

    @Autowired
    CategoryRepository categories;

    @Autowired
    OrderRepository orders;

    @Autowired
    WebApplicationContext wap;

    MockMvc mockMvc;

    @Before
    public void before() {
        mockMvc = MockMvcBuilders.webAppContextSetup(wap).build();
    }

    @Test
    public void test1CreateUser() throws Exception { //(POST route: /users)
        User user = new User("Alice", "password", "password", "Farmer", "Limehouse Produce", "charleston", "8888", "alice@alice");
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(user);
        mockMvc.perform(
                MockMvcRequestBuilders.post("/users")
                        .content(json)
                        .contentType("application/json")
        );
        Assert.assertTrue(users.count() == 4);
    }

    @Test
    public void test2GetOneUser() throws Exception { //(GET route: /users/{id})
    User user = users.findByUserName("Alice");
    Assert.assertTrue(user.getUserName().equals("Alice"));
    }

//    -getValidatingUsers (GET route: /users/validate)

    @Test
    public void test2ValidateUser() throws Exception { //(POST route: /users/validate/{id})
        ObjectMapper mapper = new ObjectMapper();
        mockMvc.perform(
                MockMvcRequestBuilders.put("/users/validate/4")
                        .sessionAttr("userName", "Admin")
        );
        Assert.assertTrue(users.findByUserName("Alice").getValid());
    }

//    -getUsersInCategory (GET route: /users/category/{category})

    @Test
    public void test3UpdateUser() throws Exception { //(PUT route: /users/{id})
        User user = users.findOne(4);
        user.setCompanyName("Rawl Produce");
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(user);
        mockMvc.perform(
                MockMvcRequestBuilders.put("/users/4")
                        .content(json)
                        .contentType("application/json")
                        .sessionAttr("userName", "Alice")
        );
        Assert.assertTrue(users.findOne(4).getCompanyName().equals("Rawl Produce"));
    }

    @Test
    public void test4Login() throws Exception { //(POST route: /login)
        User user = new User();
        user.setUserName("Alice");
        user.setPasswordHash("password");
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(user);
        ResultActions resAct =
                mockMvc.perform(
                MockMvcRequestBuilders.post("/login")
                        .content(json)
                        .contentType("application/json")
        );
        MvcResult result = resAct.andReturn();
        MockHttpServletRequest request = result.getRequest();
        HttpSession session = request.getSession();
        Assert.assertTrue(session.getAttribute("userName").equals("Alice"));
    }

    @Test
    public void test5CreateInventory() throws Exception { //(POST route: /inventory)
        Inventory inventory = new Inventory();
        inventory.setCategory("Banana");
        inventory.setName("Golden Yellow Bananas");
        inventory.setQuantityAvailable(9);
        inventory.setPrice(2.85);
        inventory.setUser(users.findByUserName("Alice"));
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(inventory);
        mockMvc.perform(
                MockMvcRequestBuilders.post("/inventory")
                        .content(json)
                        .contentType("application/json")
                        .sessionAttr("userName", "Alice")
        );
        Assert.assertTrue(inventories.count() == 2);
    }
    @Test
    public void test6UpdateInventory() throws Exception { //(PUT route: /inventory/{id})
        Inventory i = inventories.findOne(2);
        i.setCategory("Tomato");
        System.out.println();
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(i);
        mockMvc.perform(
                MockMvcRequestBuilders.put("/inventory/2")
                        .content(json)
                        .contentType("application/json")
                        .sessionAttr("userName", "Alice")
        );
        Assert.assertTrue(inventories.findOne(2).getCategory().equals("Tomato"));
    }

//    -createInventoryByAdmin (POST route: /inventory/user/{id}
//    -updateInventoryByAdmin (PUT route: /inventory/{id})

    @Test
    public void test7FindInventoryByCategory() throws Exception { //(GET route: /inventory/category/{category})
//        ObjectMapper mapper = new ObjectMapper();
//        String json = mapper.writeValueAsString(inventories.findAll());
//        mockMvc.perform(
//                MockMvcRequestBuilders.get("/inventory/category/Tomato")
//                        .content(json)
//                        .contentType("application/json")
//                        .sessionAttr("userName", "Alice")
//        );
        Assert.assertTrue(inventories.findByCategory("Tomato").size() == 1); //does this test actually work?
        // is it checking the amount of inventory items in that category?
    }

    @Test
    public void test8DeleteInventoryByUser() throws Exception { //(DELETE route: /inventory/{id})
        mockMvc.perform(
                MockMvcRequestBuilders.delete("/inventory/2")
                        .sessionAttr("userName", "Alice")
        );
        Assert.assertTrue(inventories.count() == 1);
    }


//    -deleteInventoryByAdmin (DELETE route: /inventory/{id})
//    -getAllCategories (GET route: /categories)
//    -getCategoriesByLetter (GET route: /categories/{letter})
//    -createOrderByUser (POST route: /orders)
//    -createOderByAdmin (POST route: /orders)
//    -getOrdersPending(GET route: /orders/{pending})
//    -deleteOderByUser (DELETE route: /orders/{id})
//    -deleteOrderByAdmin (DELETE route: /orders/{id})
//    -createOrderByUser (POST route: /orders)
//    -authorizeOrderByUser (GET route: /orders/authorize/{id})
//    -createOrderByUser (POST route: /orders)
//    -authorizeOrderByAdmin (GET route: /orders/authorize/{id})
//    -getOrderHistoryForFarmer *
//    -getOderHistoryForBuyer *
//    -logout (POST route: /logout)
//    -deleteUserDeniedByAdmin (DELETE route: /users/{id})

//     @Test
//    public void test#DeleteUserDeniedByAdmin() throws Exception { //(DELETE route: /users/{id})
//        mockMvc.perform(
//                MockMvcRequestBuilders.delete("/users/2")
//        );
//        Assert.assertTrue(users.count() == 1);
//    }

}
