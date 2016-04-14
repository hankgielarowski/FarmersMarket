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
//        users.deleteAll();
//        inventories.deleteAll();
        mockMvc = MockMvcBuilders.webAppContextSetup(wap).build();
    }

    @Test
    public void test1CreateUser() throws Exception {
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
    public void test2UpdateUser() throws Exception {
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
    public void test3Login() throws Exception {
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
    public void test4ValidateUser() throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        mockMvc.perform(
                MockMvcRequestBuilders.put("/users/validate/4")
                        .sessionAttr("userName", "Admin")
        );
        Assert.assertTrue(users.findByUserName("Alice").getValid());
    }


    @Test
    public void test5CreateInventory() throws Exception {
        Inventory inventory = new Inventory();
        inventory.setCategory("Banana");
        inventory.setName("Golden Yellow Bananas");
        inventory.setQuantityAvailable(9);
        inventory.setPrice(2.55);
        inventory.setUser(users.findByUserName("Alice"));
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(inventory);
        mockMvc.perform(
                MockMvcRequestBuilders.post("/inventory")
                        .content(json)
                        .contentType("application/json")
                        .sessionAttr("userName", "Alice")
        );
        Assert.assertTrue(inventories.count() == 1);
    }
    @Test
    public void test6UpdateInventory() throws Exception {
        Inventory i = inventories.findOne(1);
        i.setCategory("Tomato");
        System.out.println();
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(i);
        mockMvc.perform(
                MockMvcRequestBuilders.put("/inventory/1")
                        .content(json)
                        .contentType("application/json")
                        .sessionAttr("userName", "Alice")
        );
        Assert.assertTrue(inventories.findOne(1).getCategory().equals("Tomato"));
    }

    @Test
    public void test7FindByCategory() throws Exception {
//        ObjectMapper mapper = new ObjectMapper();
//        String json = mapper.writeValueAsString(inventories.findAll());
//        mockMvc.perform(
//                MockMvcRequestBuilders.get("/inventory/category/Tomato")
//                        .content(json)
//                        .contentType("application/json")
//                        .sessionAttr("userName", "Alice")
//        );
        Assert.assertTrue(inventories.findByCategory("Tomato").size() == 1);
    }

    @Test
    public void test8DeleteInventory() throws Exception {
        mockMvc.perform(
                MockMvcRequestBuilders.delete("/inventory/1")
                        .sessionAttr("userName", "Alice")
        );
        Assert.assertTrue(inventories.count() == 0);
    }

//     @Test
//    public void test7DeleteUser() throws Exception {
//        mockMvc.perform(
//                MockMvcRequestBuilders.delete("/users/2")
//        );
//        Assert.assertTrue(users.count() == 1);
//    }



}
