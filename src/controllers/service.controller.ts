import { serviceService } from "@/services/service.service";
import { serviceValidator } from "@/validators/service.validator";
import { RequestHandler } from "express";

const serviceController: { [keys: string]: RequestHandler } = {
  get: async (_req, res) => {
    const services = await serviceService.get();

    res.status(200).json(services);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ error: "ID parameter is missing" });
      return;
    }
    try {
      const service = await serviceService.getById(id);

      if (!service) {
        res.status(404).json({ error: "Service not found" });
        return;
      }
      res.status(200).json(service);
    } catch (error) {
      res.status(500).json({ error: "Error fetching service" });
    }
  },

  create: async (req, res) => {
    const validationResult = serviceValidator.create(req.body);

    if (!validationResult.success) {
      res.status(400).json({
        error: validationResult.error.flatten().fieldErrors,
      });
      return;
    }

    const { description, price } = validationResult.data;

    const newService = await serviceService.create({
      description,
      price,
    });
    res.status(201).json(newService);
  },

  update: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: "ID parameter is missing" });
      return;
    }

    const validationResult = serviceValidator.update(req.body);

    if (!validationResult.success) {
      res.status(400).json({
        error: validationResult.error.flatten().fieldErrors,
      });
      return;
    }

    const { description, price } = validationResult.data;

    try {
      const existingService = await serviceService.getById(id);

      if (!existingService) {
        res.status(404).json({ error: "Service not found" });
        return;
      }
      const updatedService = await serviceService.update(existingService.id, {
        description,
        price,
      });

      res.status(200).json(updatedService);
    } catch (error) {
      res.status(500).json({ error: "Error updating service" });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ error: "ID parameter is missing" });
      return;
    }
    try {
      const existingService = await serviceService.getById(id);

      if (!existingService) {
        res.status(404).json({ error: "Service not found" });
        return;
      }

      await serviceService.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Error deleting service" });
    }
  },
};

export { serviceController };

// Cofre: number | null;
// Lavanderia: number | null;
// Cafe: number | null;
// Massagem: number | null;
// Frigobar: number | null;
// Transfer: number | null
