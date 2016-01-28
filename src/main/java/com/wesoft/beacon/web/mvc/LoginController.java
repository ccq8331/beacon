/**
 * wesoft.com Inc.
 * Copyright (c) 2005-2016 All Rights Reserved.
 */
package com.wesoft.beacon.web.mvc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.wesoft.beacon.app.SiteService;
import com.wesoft.beacon.domain.Site;

/**
 * 用户登陆控制器
 *
 * @author <a href="mailto:chencq@hzwesoft.com">chencq</a>
 * @version $Id: LoginController.java, v 0.1 2016/1/21 23:23 $
 */

@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private SiteService siteService;

    @RequestMapping
    public ModelAndView init(Model model) {
        Site site = siteService.findByCityId("3301");
        model.addAttribute("test", site);
        return new ModelAndView("/login");
    }

    @RequestMapping("/query")
    public Site querySite() {
        return siteService.findByCityId("3301");
    }

}
