import { Router } from 'express';
import {
  getAllTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  resetTeamMembers,
} from '../controllers/teamController';

const router = Router();

router.get('/', getAllTeamMembers);
router.get('/:id', getTeamMemberById);
router.post('/', createTeamMember);
router.put('/:id', updateTeamMember);
router.patch('/:id', updateTeamMember);
router.delete('/:id', deleteTeamMember);
router.post('/reset', resetTeamMembers);

export default router;
