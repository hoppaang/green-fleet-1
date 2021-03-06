package com.heartyoh.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.heartyoh.dao.EntityDao;
import com.heartyoh.model.Filter;
import com.heartyoh.model.Sorter;

@Controller
public class EntityService {
	private static final Logger logger = LoggerFactory.getLogger(EntityService.class);

	@Autowired
	private EntityDao entityDao;

	@RequestMapping(value = "module/CMN/data/select.json", method = RequestMethod.GET)
	public @ResponseBody
	Map<String, Object> select(HttpServletRequest request, HttpServletResponse response) {
		String table = (String) request.getParameter("table");
		String[] selects = (String[]) request.getParameterValues("selects");
		String start = request.getParameter("start");
		String limit = request.getParameter("limit");

		String jsonFilter = request.getParameter("filter");
		String jsonSorter = request.getParameter("sort");
		
		System.out.println(jsonFilter);
		
		List<Filter> filters = null;
		List<Sorter> sorters = null;
		try {
			if(jsonFilter != null) {
				filters = new ObjectMapper().readValue(request.getParameter("filter"), new TypeReference<List<Filter>>(){ });
			}
			if(jsonSorter != null) {
				sorters = new ObjectMapper().readValue(request.getParameter("sort"), new TypeReference<List<Sorter>>(){ });
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("total", entityDao.selectCount(table, filters));
		resultMap.put("result", entityDao.select(table, selects, filters, sorters, Integer.parseInt(start), Integer.parseInt(limit)));

		return resultMap;
	}
}
