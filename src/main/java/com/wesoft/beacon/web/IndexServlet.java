/**
 * wesoft.com Inc.
 * Copyright (c) 2005-2016 All Rights Reserved.
 */
package com.wesoft.beacon.web;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * / 路径打开页面，自动指向登陆页面
 *
 * @author <a href="mailto:chencq@hzwesoft.com">chencq</a>
 * @version $Id: IndexServlet.java, v 0.1 2016/1/21 23:47 $
 */
@RestController
public class IndexServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    private final String INDEX = "/login";

    @RequestMapping
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher(INDEX).forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

}
